import { _decorator, Component, Node, Button, director, game, screen } from 'cc';
import { AudioToggle } from './AudioToggle';
const { ccclass, property } = _decorator;

@ccclass('ButtonMenuScene')
export class ButtonMenuScene extends Component {
    @property(Button)
    public playBtn: Button = null;
    @property(Button)
    public settingBtn: Button = null;
    @property(Button)
    public moreGameBtn: Button = null;
    @property(Button)
    public fullScreenBtn: Button = null;
    @property(Button)
    public backBtn: Button = null;
    @property(Node)
    public settingNode: Node = null;
    @property
    url:string = 'https://www.marketjs.com/game/links/mobile/';
    @property
    public playScene: string = "";
    PLay(){
        AudioToggle.instance.onAudioQueue(2);
        director.loadScene(this.playScene);
    }
    Setting(){
        AudioToggle.instance.onAudioQueue(2);
        this.settingNode.active = true;
        AudioToggle.instance.updateUI();
        this.moreGameBtn.onDisable();
        this.playBtn.onDisable();
        this.settingBtn.onDisable();
        this.fullScreenBtn.onDisable();
    }
    moreGame(){
        AudioToggle.instance.onAudioQueue(2);
        if (this.url !== '') {
            window.open(this.url, '_blank');
        } else {
            console.error('URL is not set!');
        }
    }
    Back(){
        AudioToggle.instance.onAudioQueue(2);
        this.settingNode.active = false;
        this.moreGameBtn.onEnable();
        this.playBtn.onEnable();
        this.settingBtn.onEnable();
        this.fullScreenBtn.onEnable();
    }
    fullScreen(){
        AudioToggle.instance.onAudioQueue(2);
        screen.requestFullScreen();
    }
    
}


