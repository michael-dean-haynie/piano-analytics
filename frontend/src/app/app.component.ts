import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import {createClient, Timestamp} from 'piano-analytics'
import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import authentication from '@feathersjs/authentication-client'
import {Application} from "@feathersjs/feathers";
import {MidiService} from "./midi.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private midiService: MidiService) {}
  title = 'piano-analytics';

  async ngOnInit(): Promise<void> {
    await this.midiService.initialize()
  }
}
