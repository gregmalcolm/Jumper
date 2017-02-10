import isInDebugMode from '../Debug';
import { DebugGraphicsObjectSquare } from '../DebugGraphicsObjects.js';
import Item from './Item.js';
import EmitterComponent from '../EmitterComponent';

export function loadPortalImages(game) {
    game.load.image('portal_orange', 'assets/Items/portal_orange.png');
    game.load.image('portal_yellow', 'assets/Items/portal_yellow.png');

    game.load.image('portal_orangeParticle', 'assets/Particles/portal_orangeParticle.png');
    game.load.image('portal_yellowParticle', 'assets/Particles/portal_yellowParticle.png');
}

export const PortalTypes = {
    ORANGE: 'portal_orange',
    YELLOW: 'portal_yellow'
};

export class Portal extends Item {
    constructor(game, type, x, y, up = true) {
        super();
        this.type = type.toLowerCase();
        this.sprite = game.add.sprite(x, y, this.type);

        game.physics.arcade.enable(this.sprite);

        this.sprite.width = 64;
        this.sprite.height = 16;

        this.otherPortal = null;
        this.direction = up ? -1 : 1;

        this.emitterComponent = new EmitterComponent(game, x + 32, y + 10, 50);
        this.emitterComponent.setWidth(50);
        this.emitterComponent.makeParticles(`${this.type}Particle`);
        this.emitterComponent.setSpeed(0, 0, 2, 10);
        this.emitterComponent.setScaleBoth(.5, .5);
        this.emitterComponent.setGravity(200 * this.direction);
        this.emitterComponent.start(false, 700, 100);

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    linkToPortal(otherPortal) {
        this.otherPortal = otherPortal;
    }

    update(deltaTime) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }

        this.emitterComponent.emitter.forEachAlive(function(particle){
            particle.alpha -= deltaTime * 1.25;
        }, null);
    }

    movePlayer(player){
        let newX = this.sprite.x + 8 + (player.sprite.width / 2);
        let deltaX = player.sprite.x - newX;
        player.sprite.x = this.sprite.x + 8 + (player.sprite.width / 2);
        if (this.direction === -1) {
            player.sprite.y = this.sprite.y - player.sprite.height - 5;
        }
        else {
            player.sprite.y = this.sprite.y + this.sprite.height + 5;
        }
        return deltaX;
    }

    touchItem(player) {
        if (this.otherPortal) {
            return this.otherPortal.movePlayer(player);
        }
    }
}
