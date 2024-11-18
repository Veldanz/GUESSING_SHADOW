import Phaser from "phaser";
import Level from "../scenes/Level";

export default class Shadow extends Phaser.GameObjects.Image {
    private isCorrect: boolean;
    public color_mouseover: string = "0x44ff44";
    public color_disabled: string = "555555ff";

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, isCorrect: boolean = false) {
        super(scene, x, y, texture);
        
        // Initialize properties
        this.setOrigin(0.5);
        this.isCorrect = isCorrect;
        
        // Set up interactions
        this.setInteractive();
        this.setupEventListeners();
        
        // Add to scene
        scene.add.existing(this);
    }

    private setupEventListeners(): void {
        this.on('pointerdown', this.handleButtonClick, this);
        this.on('pointerover', () => this.setTint(Number(this.color_mouseover)));
        this.on('pointerout', () => this.clearTint());
    }

    public isAnswerCorrect(): boolean {
        return this.isCorrect;
    }

    private handleButtonClick(): void {
        const level = this.scene as Level;
        if (level.guessShadow) {
            level.guessShadow(this.isCorrect);
        }
    }

    public setInteractiveState(interactive: boolean): void {
        if (interactive) {
            this.setInteractive();
            this.on('pointerover', () => { if(this.active) this.setScale(0.16); })
            this.on('pointerout', () => { if(this.active) this.setScale(0.13); });
            this.clearTint();
        } else {
            this.disableInteractive();
            this.setTint(Number(this.color_disabled));
        }
    }
}