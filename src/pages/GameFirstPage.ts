class GameFirstPage extends BaseNormalPage {
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
		super.childrenCreated();
		this.eventListen();
		let img = new DouDing();

		console.log(img.width,img.height,img);
		this.addChild(img);

		// setTimeout(()=>{
		// 	img.changeBaseImg('purpleSmallMonster');
		// 	// img.baseImg.texture = RES.getRes('bean_face_spring_down_normal_png');
		// 	//  img.baseImg.texture = null;
		// 	 console.log(img.baseImg);
		// },1500)

		// var image = new eui.Image();
        // image.source = "bean_face_normal_png";

		// console.log(image.width,image.height,image);
	
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