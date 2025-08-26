import { defineStore } from 'pinia'
import type { Box } from '@/types/Calendar.ts'

const LOCAL_STORAGE_KEY = 'calendarState'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    width: 100,
    height: 100,
    prize100Count: 100,
    prize25000Count: 1,
    boxes: [] as Box[],
  }),
  getters: {
    totalBoxes: (state) => state.width * state.height,
  },
  actions: {
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
        ;[prizes[i], prizes[j]] = [prizes[j], prizes[i]]
      }

      this.boxes = prizes.map((prize, i) => ({
        id: i,
        prize,
        opened: false
      }));

      this.saveToLocalStorage()
    },
    openBox(boxId: number) {
      const box = this.boxes.find(b => b.id === boxId);
      if (box && !box.opened) {
        box.opened = true;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      const data = {
        width: this.width,
        height: this.height,
        prize100Count: this.prize100Count,
        prize25000Count: this.prize25000Count,
        boxes: this.boxes,
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        this.width = data.width
        this.height = data.height
        this.prize100Count = data.prize100Count
        this.prize25000Count = data.prize25000Count
        this.boxes = data.boxes
      } else {
        // First load → generate new grid
        this.initializeGrid()
      }
    },
    resetGrid(width: number, height: number, prize100Count: number, prize25000Count: number) {
      this.width = width
      this.height = height
      this.prize100Count = prize100Count
      this.prize25000Count = prize25000Count
      this.initializeGrid()
    },
  },
})
