import { Injectable } from '@angular/core';
import {WebMidi} from "webmidi";
import {FeathersService} from "./feathers.service";
import {Timestamp} from "piano-analytics";
import {TimestampService} from "piano-analytics/lib/services/timestamps/timestamps.class";

@Injectable({
  providedIn: 'root'
})
export class MidiService {

  constructor(private feathersService: FeathersService) { }

  timestamp: Timestamp | null = null;

  async initialize(): Promise<void> {
    await this.establishTimestamp()
    WebMidi
      .enable()
      .then(() => {
        console.log('Initializing MidiService');
        this.printInputsOutputs();
        this.bindListeners();
        WebMidi.addListener('connected', () => {
          this.printInputsOutputs();
          this.bindListeners();
        });
        WebMidi.addListener('disconnected', () => {
          this.printInputsOutputs();
          this.bindListeners();
        })
      })
      .catch(err => console.error(err));
  }

  private printInputsOutputs(): void {
    console.log('Midi Inputs/Outputs Updated:');
    console.log('INPUTS:');
    WebMidi.inputs.forEach(input => console.log(`${input.manufacturer} | ${input.name}`));
    console.log('OUTPUTS:');
    WebMidi.outputs.forEach(output => console.log(`${output.manufacturer} | ${output.name}`));
  }

  private bindListeners(): void {
    const input = WebMidi.inputs[0];
    input.addListener("midimessage", e => {
      console.log(`${e.timestamp} | ${e.type} | ${e.message.type} | [${e.message.data}]`);
    })
  }

  private async establishTimestamp(): Promise<void> {
    const timestampService = this.feathersService.client.service('timestamps');
    this.timestamp = await timestampService.create({ msOffset: performance.now() });
    console.log('established timestamp:', this.timestamp);
  }
}
