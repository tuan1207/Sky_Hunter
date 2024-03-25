import { _decorator, Button, Canvas, Component, director, Game, game, Node, Tween, tween, UITransform, Vec3 } from 'cc';
import { Plane } from './Plane';
import { GameCtrl } from './GameCtrl';
import { AudioToggle } from './AudioToggle';
import { Boss } from './Boss';
const { ccclass, property } = _decorator;

@ccclass('ButtonPlayScene')
export class ButtonPlayScene extends Component {
    static instance: ButtonPlayScene;
    @property(Button)
    public pauseBtn: Button = null;
    @property(Button)
    public homeBtn: Button = null;
    @property(Button)
    public restartBtn: Button = null;
    @property(Button)
    public resumeBtn: Button = null;
    @property(Node)
    public pauseNode: Node = null;
    @property
    public menuScene: string = "";
    @property
    public playScene: string = "";
    @property(Canvas)
    public canvas: Canvas = null;

    public spawnEnabled: boolean = true;
    public moveEnable: boolean = true;

    protected onLoad(): void {
        ButtonPlayScene.instance = this;
    }

    Pause(){
        AudioToggle.instance.onAudioQueue(2);
        this.spawnEnabled = false;
        this.scheduleOnce(() => {this.pauseNode.active = true;});
        this.scheduleOnce(() => {this.moveEnable = false;});
    }
    Home(){
        AudioToggle.instance.onAudioQueue(2);
        director.loadScene(this.menuScene);
    }
    Restart(){
        AudioToggle.instance.onAudioQueue(2);
        director.loadScene(this.playScene);
    }
    Resume(){
        AudioToggle.instance.onAudioQueue(2);
        this.spawnEnabled = true;
        this.scheduleOnce(() => {this.pauseNode.active = false;});
        this.scheduleOnce(() => {this.moveEnable = true;});
    }
}


