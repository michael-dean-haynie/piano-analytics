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
      .then(async () => {
        console.log('Initializing MidiService');
        this.printInputsOutputs();
        await this.bindListeners();
        WebMidi.addListener('connected', async () => {
          this.printInputsOutputs();
          await this.bindListeners();
        });
        WebMidi.addListener('disconnected', async () => {
          this.printInputsOutputs();
          await this.bindListeners();
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

  private async bindListeners(): Promise<void> {
    const input = WebMidi.inputs[0];
    input.removeListener() // all of them
    input.addListener("midimessage", async (e: any) => {
      if (!this.timestamp || !this.timestamp.id){
        return;
      }
      if (e.message.isChannelMessage && e.message.channel === 1) {
        const messagesService = this.feathersService.client.service('messages');
        const message = await messagesService.create({
          timestampId: this.timestamp?.id,
          msOffset: performance.now(),
          statusByte: e.data[0],
          dataByte1: e.data[1],
          dataByte2: e.data[2],
        });
        console.log(message);
      }
    })
  }

  private async establishTimestamp(): Promise<void> {
    const timestampService = this.feathersService.client.service('timestamps');
    this.timestamp = await timestampService.create({ msOffset: performance.now() });
    console.log('established timestamp:', this.timestamp);
  }
}
