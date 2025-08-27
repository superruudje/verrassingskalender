import { defineStore } from 'pinia'
import type { Box } from '@/types/Calendar.ts'
import { popConfetti } from '@/helpers/confetti.ts'

const LOCAL_STORAGE_KEY = 'calendarState'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    width: 10,
    height: 10,
    prize100Count: 10,
    prize25000Count: 1,
    minigame: true,
    gameStarted: false,
    boxes: [] as Box[],
  }),
  getters: {
    /**
     * A getter function that calculates the total number of boxes
     * based on the current state's width and height.
     *
     * @param {Object} state - The current state object containing width and height properties.
     * @returns {number} The total number of boxes calculated as width multiplied by height.
     */
    totalBoxes: (state) => state.width * state.height,
  },
  actions: {
    /**
     * Initializes the grid with randomized prizes and sets up the boxes.
     * The prizes include a specific number of €25,000 and €100 prizes,
     * with the remainder being filled with €0 prizes. The order of prizes
     * is randomized, and each box is assigned an ID, prize value, and
     * initialized as not opened.
     *
     * @return {void} Does not return any value. Sets up the grid and stores its state locally.
     */
    initializeGrid() {
      const total = this.width * this.height
      const prizes: number[] = []

      // Add €25,000 prizes
      for (let i = 0; i < this.prize25000Count; i++) {
        prizes.push(25000)
      }

      // Add €100 prizes
      for (let i = 0; i < this.prize100Count; i++) {
        prizes.push(100)
      }

      // Fill the rest with 0
      while (prizes.length < total) {
        prizes.push(0)
      }

      // Shuffle the grid to randomize the prizes
      for (let i = prizes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[prizes[i]!, prizes[j]!] = [prizes[j]!, prizes[i]!]
      }

      this.boxes = prizes.map((prize, i) => ({
        id: i,
        prize,
        opened: false,
      }))

      this.saveToLocalStorage()
    },
    /**
     * Opens a box by its id. If the box contains a prize, a confetti effect is triggered.
     * The state of the boxes is saved to local storage after opening the box.
     *
     * @param {number} boxId - The unique identifier of the box to open.
     * @return {void} This method does not return a value.
     */
    openBox(boxId: number) {
      const box = this.boxes.find((b) => b.id === boxId)
      if (box && !box.opened) {
        box.opened = true
        if (box.prize) popConfetti()
        this.saveToLocalStorage()
      }
    },
    /**
     * Saves the current instance data to local storage using a predefined key.
     * Serializes the object data including width, height, prize counts, and boxes into JSON format.
     *
     * @return {void} This method does not return any value.
     */
    saveToLocalStorage() {
      const data = {
        width: this.width,
        height: this.height,
        prize100Count: this.prize100Count,
        prize25000Count: this.prize25000Count,
        minigame: this.minigame,
        gameStarted: this.gameStarted,
        boxes: this.boxes,
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    },
    /**
     * Loads the application state from the browser's local storage using a predefined key.
     * If data is found, it parses and populates the necessary properties such as width,
     * height, prizes, and grid boxes. If no data is found, the method initializes a new grid.
     *
     * @return {void} This method does not return a value.
     */
    loadFromLocalStorage() {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        this.width = data.width
        this.height = data.height
        this.prize100Count = data.prize100Count
        this.prize25000Count = data.prize25000Count
        this.minigame = data.minigame
        this.gameStarted = data.gameStarted
        this.boxes = data.boxes
      }
    },
    /**
     * Initializes and starts the game with the specified parameters.
     *
     * @param {number} width - The width of the game grid.
     * @param {number} height - The height of the game grid.
     * @param {number} prize100Count - The number of $100 prizes to be placed in the game.
     * @param {number} prize25000Count - The number of $25,000 prizes to be placed in the game.
     * @param {boolean} minigame - Indicates whether the minigame is enabled.
     * @return {void} This method does not return a value.
     */
    startGame(
      width: number,
      height: number,
      prize100Count: number,
      prize25000Count: number,
      minigame: boolean,
    ) {
      this.width = width
      this.height = height
      this.prize100Count = prize100Count
      this.prize25000Count = prize25000Count
      this.minigame = minigame
      this.gameStarted = true
      this.initializeGrid()
    },
    resetGame() {
      this.gameStarted = false
      this.saveToLocalStorage()
    },
  },
})
