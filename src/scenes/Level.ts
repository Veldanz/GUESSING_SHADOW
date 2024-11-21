import Phaser from "phaser";
//import ShadowPrefab from "../prefabs/Shadow";
import ShadowContainer from "../prefabs/ShadowContainer";
import { GameInfo, GameStateContent, UserInformation } from "~/data/gameState";
import Shadow from "../prefabs/Shadow";

export default class Level extends Phaser.Scene {
    private container_picture!: Phaser.GameObjects.Image;
    //private container_shadows!: Phaser.GameObjects.Container;
    private gameInfo: GameInfo | undefined;
    private gameState: GameStateContent | undefined;
    private userInfo: UserInformation | undefined;
    private wrongGuessCount: number = 0;
    private gameOverText?: Phaser.GameObjects.Text;
    private shadowContainer!: ShadowContainer;

	private readonly CONFIG = {
        mainPicture: {
            scale: 1,
            width: 400,  // Optional: set specific width
            height: 300  // Optional: set specific height
        },
        shadows: {
            scale: 0.4,
            width: 300,  // Optional: set specific width
            height: 200  // Optional: set specific height
        }
    };

    constructor() {
        super({
            key: "Level",
			
        });
    }

    preload(): void {
        // You can add additional asset loading here if needed
        // this.load.image('additional_asset', 'path/to/asset');
    }

    create(): void {
        this.editorCreate();
        window.addEventListener('message', this.handleMessage);
        this.requestUserInfo();
    }

    editorCreate(): void {
        // Add background
        this.add.image(this.scale.width / 2, this.scale.height / 2, "BG");

        // Add picture container
        this.container_picture = this.add.image(
            this.scale.width / 2, 
            this.scale.height / 4, 
            "Pic_elephant"
        );
        this.container_picture.setScale(0.5);

		
        
        // Create shadow container
        this.shadowContainer = new ShadowContainer(this, 0, 0);
        
        // Add shadows
        const shadowData = [
            { x: 150, y: 570, texture: "shadow_elephant_f_1", isCorrect: false },
            { x: 450, y: 570, texture: "shadow_elephant_f_2", isCorrect: false },
            { x: 750, y: 570, texture: "shadow_elephant_t", isCorrect: true },
            { x: 1050, y: 570, texture: "shadow_elephant_f_3", isCorrect: false },
        ];
        
        shadowData.forEach(({ x, y, texture, isCorrect }) => {
            const shadow = new Shadow(this, x, y, texture, isCorrect);
            // Apply shadow scaling or specific dimensions
            if (this.CONFIG.shadows.scale) {
                shadow.setScale(this.CONFIG.shadows.scale);
            } else {
                shadow.setDisplaySize(
                    this.CONFIG.shadows.width,
                    this.CONFIG.shadows.height
                );
            }
            this.shadowContainer.addShadow(shadow);
        });

        //Set background color
        //this.cameras.main.setBackgroundColor('#ffffff');

        this.events.emit("scene-awake");
        // Enable shadows to ensure hover works from the start
        this.shadowContainer.enableAllShadows(); 
    }

    guessShadow(isCorrect: boolean): void {
        if (isCorrect) {
            this.showMessage("Correct!", '#00ff00');
            this.shadowContainer.disableAllShadows();
            // You might want to add victory handling here
        } else {
            this.wrongGuessCount++;
            if (this.wrongGuessCount >= 3) {
                this.showGameOverScreen();
            } else {
                this.showMessage("Incorrect, try again!", '#ff0000');
            }
        }
    }

    requestShadow(): void {
        this.postMessage({
            type: "requestParam",
            payload: {
                "requestName": "startGuess",
                "requestLocalization": "Please guess the shadow.",
                "type": "string",
            }
        });
    }

    updateShadowAnswer(wrongGuessCount: number): void {
        if (wrongGuessCount > 3) {
            this.showGameOverScreen();
        } else {
            console.info(`Wrong guesses: ${wrongGuessCount}`);
        }
    }

    private showMessage(text: string, color: string) {
        const message = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            text,
            { 
                fontSize: '32px', 
                color: color,
                backgroundColor: '#ffffff',
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5);

        this.time.delayedCall(1000, () => {
            message.destroy();
        });
    }

    private showGameOverScreen() {
        this.gameOverText?.destroy();

        this.gameOverText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            "Game Over\nClick to Retry",
            { 
                fontSize: '32px', 
                color: '#ff0000', 
                align: 'center',
                backgroundColor: '#ffffff',
                padding: { x: 20, y: 20 }
            }
        ).setOrigin(0.5);
        
        this.gameOverText.setInteractive();
        this.gameOverText.on('pointerdown', () => {
            this.resetGame();
        });
    }

    private resetGame() {
        this.wrongGuessCount = 0;
        this.gameOverText?.destroy();
        this.shadowContainer.enableAllShadows();
        this.requestUserInfo();
        this.events.emit("scene-awake");
    }

    requestUserInfo() {
        this.postMessage({
            type: "requestInit",
            payload: null,
        });
    }

    handleMessage = (event: MessageEvent) => {
        try {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            console.info('PHASER handleMessage:', JSON.stringify(data));

            switch(data.type) {
                case "requestInit": {
                    this.userInfo = data.payload.userInfo;
                    this.gameInfo = data.payload.gameInfo;

                    const permission = this.gameInfo?.permissionList.find(p => p.identity == this.userInfo?.preferred_username);
                    if (permission) this.requestShadow();
                    break;
                }
                case "serverGameUpdate": {
                    this.updateState(data.payload);
                    break;
                }
                case "requestParam": {
                    const requestData = data.payload;
                    if (requestData.requestName === "startGuess") {
                        this.postMessage({
                            type: "clientGameUpdate",
                            payload: {
                                shadowAnswer: requestData.value,
                            }
                        });
                    }
                    break;
                }
                case "restartGame": {
                    this.resetGame();
                    break;
                }
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };

    postMessage(message: any) {
        const messageString = JSON.stringify(message);
        
        if (window.parent !== window) {
            console.info('PHASER(web) postMessage:', messageString);
            window.parent.postMessage(message, '*');
        }
        
        if (window.ReactNativeWebView) {
            console.info('PHASER(native) postMessage:', messageString);
            window.ReactNativeWebView.postMessage(messageString);
        }
    }

    updateState(newState: GameStateContent | null) {
        if (!newState) return;

        const oldState = this.gameState;
        this.gameState = newState;

        if (this.gameState && oldState?.shadowAnswer !== this.gameState.shadowAnswer) {
            this.initGame(this.gameState.shadowAnswer);
        }

        this.updateShadowAnswer(this.gameState.wrongGuessCount);
    }

    private initGame(shadowAnswer: string) {
        this.wrongGuessCount = 0;
        this.gameState = {
            guessedShadow: [],
            shadowAnswer: shadowAnswer.trim().toUpperCase(),
            wrongGuessCount: 0,
        };
    }
}