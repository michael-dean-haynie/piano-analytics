import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import {ClientApplication, createClient} from "piano-analytics";
import authentication from "@feathersjs/authentication-client";

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    const port = document.location.port || '80'
    const connection = socketio(io());
    this.client = createClient(connection);
    this.client.configure(authentication());
  }

  public client: ClientApplication
}
