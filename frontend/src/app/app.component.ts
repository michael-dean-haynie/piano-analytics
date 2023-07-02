import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import {createClient, Timestamp} from 'piano-analytics'
import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import authentication from '@feathersjs/authentication-client'
import {Application} from "@feathersjs/feathers";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
    const port = document.location.port || '80'
    const connection = socketio(io());
    const client = createClient(connection);
    client.configure(authentication());
    this.authenticate(client);

    const timestampService = client.service('timestamps');
    timestampService.on('created', (timestamp: Timestamp) =>
      console.log('Created a timestamp', timestamp)
    );

  }
  title = 'piano-analytics';

  async authenticate(client: Application) {
    try {
      // Authenticate with the local email/password strategy
      await client.authenticate({
        strategy: 'local',
        email: 'js.bach@gc.com',
        password: 'js.bach'
      });
      console.log('nice');
      // Show e.g. logged in dashboard page
    } catch (error: any) {
      // Show login page (potentially with `e.message`)
      console.error('Authentication error', error);
    }
  }
}
