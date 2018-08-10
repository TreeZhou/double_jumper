class GameFirstPage extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	private rankBtn:eui.Group;
	private shopBtn:eui.Group;
	private diamondBtn:eui.Group;
	private beginPlayBtn:eui.Group;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		this.percentHeight=100;
		this.percentWidth=100;
		super.childrenCreated();
		this.eventListen();
	}

	private eventListen() {
		this.beginPlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showPlayGamePage,this);
	}
	private showPlayGamePage(){
		this.parent.removeChild(this);
		Main.gamePage = new GamePage();
		Main.instance.addChild(Main.gamePage);
		Main.gamePage.beginGame();
	}

	
}