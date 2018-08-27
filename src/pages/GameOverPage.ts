class GameOverPage extends BasePage{
	public constructor() {
		super();
	}
	private scoreText:eui.Label;
	private playAgain:eui.Image;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.beginListenEvent();
		this.percentWidth = 100;
		this.percentHeight = 100;
	}
	public setScoreText(text) {
		this.scoreText.text = text;
	}
	/**
	 * 监听点击事件
	 */
	private beginListenEvent() {
		this.playAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.parent.removeChild(this);
			Main.gamePage = new GamePage();
			Main.instance.addChild(Main.gamePage);
			// Main.gamePage.visible = true;
			Main.gamePage.beginGame();
		}, this)
	}


	
}