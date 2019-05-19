import { AppUI } from '../UI/AppUI';

const Platform = (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) ? "desktop" : "web";

export class App {
    UI!: AppUI;
    Start() {
        this.UI = new AppUI();
        this.UI.Start(Platform);
        this.UI.Show();
    }
}