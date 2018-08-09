class DoodlePlayer extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	private DoodleNormalRight:eui.Image;
	private DoodleNormalLeft:eui.Image;

	public SIDE_STATUS:number=1;
	public SIDE_RIGHT:number=1;  // 右边
	public SIDE_LEFT:number=2;  // 左边
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	public setSideStatus(sideStatus){
		switch(sideStatus) {
			case this.SIDE_LEFT:
			this.SIDE_STATUS = this.SIDE_LEFT;
			break;
			case this.SIDE_RIGHT:
			this.SIDE_STATUS = this.SIDE_RIGHT;
			break;

		}
		this.changePlaySide();
	}
	public changePlaySide(){
		switch(this.SIDE_STATUS) {
			case this.SIDE_LEFT:
			this.DoodleNormalRight.visible = false;
			this.DoodleNormalLeft.visible = true;
			break;
			case this.SIDE_RIGHT:
			this.DoodleNormalRight.visible = true;
			this.DoodleNormalLeft.visible = false;
			break;

		}
	}
	
}