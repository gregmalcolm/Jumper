export class HUD {
    constructor(game) {
        this.fontOptions = {
            fontSize: '30px',
            font: 'Bubblegum',
            strokeThickness: 5
        };
        this.goodHealth = {fill: '#29ad60', stroke: '#1b8246'};
        this.badHealth = {fill: '#ffad49', stroke: '#ea8509'};
        this.crititcalHealth = {fill: '#ff5656', stroke: '#d30a0a'};

        this.healthText = game.add.text(16, 16, '', Object.assign(this.fontOptions, this.goodHealth));

        this.coinFontOptions = {fontSize: '24px', font: 'Bubblegum', strokeThickness: 5};

        this.bronzeFontOptions = Object.assign({fill: '#E99F64', stroke: '#A57045'}, this.coinFontOptions);
        this.bronzeCoinText = game.add.text(40, 50, 'x0', this.bronzeFontOptions);

        this.silverFontOptions = Object.assign({fill: '#95B3B5', stroke: '#576C6D'}, this.coinFontOptions);
        this.silverCoinText = game.add.text(40, 75, 'x0', this.silverFontOptions);

        this.goldFontOptions = Object.assign({fill: '#FFCC00', stroke: '#A38200'}, this.coinFontOptions);
        this.goldCoinText = game.add.text(40, 100, 'x0', this.goldFontOptions);

        this.bronzeCoin = game.add.sprite(16, 52, 'coin_bronze');
        this.bronzeCoin.scale.setTo(.4, .4);

        this.silverCoin = game.add.sprite(16, 77, 'coin_silver');
        this.silverCoin.scale.setTo(.4, .4);

        this.goldCoin = game.add.sprite(16, 102, 'coin_gold');
        this.goldCoin.scale.setTo(.4, .4);
    }

    updateHealth(health) {
        this.healthText.text = `Health: ${health}`;

        if (health > 5) {
            this.healthText.stroke = this.goodHealth.stroke;
            this.healthText.fill = this.goodHealth.fill;
        }
        else if (health <= 5 && health > 2) {
            this.healthText.stroke = this.badHealth.stroke;
            this.healthText.fill = this.badHealth.fill;
        }
        else if (health <= 2) {
            this.healthText.stroke = this.crititcalHealth.stroke;
            this.healthText.fill = this.crititcalHealth.fill;
        }
    }

    updateCoinAmount(type, amount) {
        this[`${type}CoinText`].text = `x${amount}`;
    }
}

export function loadHUDImages(game) {
    game.load.image('coin_bronze', 'assets/HUD/coin_bronze.png', 61, 61);
    game.load.image('coin_silver', 'assets/HUD/coin_silver.png', 61, 61);
    game.load.image('coin_gold', 'assets/HUD/coin_gold.png', 61, 61);
}
