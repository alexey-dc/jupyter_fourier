import Deezer from './deezer'
import Spectrogram from 'spectrogram'
import chroma from 'chroma-js'

import {
  Widget
} from '@lumino/widgets';

export default class extends Widget {
  private root: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private trackId: HTMLInputElement;
  private loadTrack: HTMLButtonElement;
  private stop: HTMLButtonElement;
  private spectro: any;
  private deezer: Deezer;
  private started: boolean;

  constructor() {
    super()

    this.started = false

    this.root = document.createElement("div")
    const trackIdLabel = document.createElement("div")
    this.trackId = document.createElement("input")
    this.loadTrack = document.createElement("button")
    this.stop = document.createElement("button")
    this.canvas = document.createElement("canvas")

    trackIdLabel.innerHTML = "Deezer track ID:"
    this.trackId.value = "3135556"
    this.loadTrack.innerHTML = "Load track and show spectrogram"
    this.stop.innerHTML = "Stop"

    this.deezer = new Deezer()

    const clear = () => {
      if(this.started) {
        this.spectro.clear()
      }
      this.started = false
    }

    this.loadTrack.onclick = async () => {
      clear()
      const trackInfo: any = await this.deezer.getTrack(this.trackId.value)
      await this.showTrackFrequencies(trackInfo.preview)
    }
    this.stop.onclick = () => {
      // They have a stop method but it doesn't stop the visualization
      this.spectro.pause()
    }

    this.root.style.padding = "16px"
    this.canvas.style.width = "70%"
    this.canvas.style.height = "70%"

    this.node.appendChild(this.root)
    this.root.appendChild(trackIdLabel)
    this.root.appendChild(this.trackId)
    this.root.appendChild(this.loadTrack)
    this.root.appendChild(this.stop)
    this.root.appendChild(document.createElement("br"))
    this.root.appendChild(document.createElement("br"))
    this.root.appendChild(this.canvas)

    this.spectro = Spectrogram(this.canvas, {
      audio: { enable: true },
      colors: function(steps: number) {
        const baseColors = [[54,53,55,1], [239,45,86,1], [237,125,58,1], [140,216,103,1], [ 47,191,113,1]];
        const positions = [0, 0.15, 0.30, 0.50, 0.75];

        const scale = new chroma.scale(baseColors, positions).domain([0, steps]);
        const colors = [];
        for (var i = 0; i < steps; ++i) {
          const color = scale(i);
          colors.push(color.hex());
        }

        return colors;
      }
    })
    Object.assign(window, {spectro: this.spectro, dz: this.deezer})
  }


  async showTrackFrequencies(url: string) {
    const audioContext = new AudioContext();

    const sound = await fetch(url)
    const arrayBuffer = await sound.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    this.spectro.connectSource(audioBuffer, audioContext)
    this.spectro.start()
    this.started = true
  }

}
