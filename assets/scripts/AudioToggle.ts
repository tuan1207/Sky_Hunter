import { _decorator, AudioClip, AudioSource, Component, Node, Toggle, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioToggle')
export class AudioToggle extends Component {
    static instance: AudioToggle;

    @property(AudioClip)
    public clips: AudioClip [] = [];

    @property(Node)
    public turnOnA: Node = null;
    @property(Node)
    public turnOffA: Node = null;
    @property(AudioSource)
    public audioSrc: AudioSource = null;

    @property(Node)
    public turnOnM: Node = null;
    @property(Node)
    public turnOffM: Node = null;
    @property(AudioSource)
    public musicSrc: AudioSource = null;

    private audioStatus: boolean = true;
    private musicStatus: boolean = true;



    protected onLoad(): void {
        AudioToggle.instance = this;
        this.updateUI();
    }
    protected update(dt: number): void {
        
    }
    updateUI(){
        let savedAStatus = sys.localStorage.getItem('audioStatus')??'on';
        if(savedAStatus === 'on'){
            this.audioStatus = true;
            this.turnOnA.active = true;
            this.turnOffA.active = false;
            this.audioSrc.volume = 0.2;
        }else if(savedAStatus === 'off'){
            this.audioStatus = false;
            this.turnOnA.active = false;
            this.turnOffA.active = true;
            this.audioSrc.volume = 0;
        }
        
        let savedMStatus = sys.localStorage.getItem('musicStatus')??'on';
        if(savedMStatus === 'on'){
            this.musicStatus = true;
            this.turnOnM.active = true;
            this.turnOffM.active = false;
            this.musicSrc.volume = 0.2;
        }else if(savedMStatus === 'off'){
            this.musicStatus = false;
            this.turnOnM.active = false;
            this.turnOffM.active = true;
            this.musicSrc.volume = 0;
        }
    }

    onAudioQueue(index: number){
        let clip: AudioClip = this.clips[index];
        this.audioSrc.playOneShot(clip);
    }

    audioTogFunc(){
        this.audioStatus = !this.audioStatus;
        sys.localStorage.setItem('audioStatus', this.audioStatus ? 'on':'off');
        this.updateUI();
    }
    musicTogFunc(){
        this.musicStatus = !this.musicStatus;
        sys.localStorage.setItem('musicStatus', this.musicStatus ? 'on':'off');
        this.updateUI();
    }
}


