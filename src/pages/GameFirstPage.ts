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
		let img = new NormalSticket();

		console.log(img.width,img.height,img);
	
		let pley= new Spring(img);
		img.addChild(pley);
		this.addChild(img);
		img.$x = this.stage.$stageWidth/2;
		img.$y = this.stage.$stageHeight/2;
		console.log(img.width,img.height,img);

		// setTimeout(()=>{
		// 	// img.changeBaseImg('purpleSmallMonster');
		// 	// img.baseImg.texture = RES.getRes('bean_face_spring_down_normal_png');
		// 	//  img.baseImg.texture = null;
		// 	//  console.log(img.baseImg);
		// 	img.sticketSelfSkill();
		// },1500)
		// let caculte = new CalculatePonitXY();
		// let list = caculte.randomPointXY([{
		// 	roleObj:new WoodSticket(),
		// 	maxDistance:50,
		// 	minDistance:40
		// },
		// {
		// 	roleObj:new WoodSticket(),
		// 	maxDistance:50,
		// 	minDistance:40
		// }
		// ],this.stage.$stageHeight,this.stage.$stageWidth);

		// for(let i=0;i<list.length;i++) {
		// 	this.addChild(list[i].roleObj);
		// }
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