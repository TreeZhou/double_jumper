class FloorSpring extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	private Federzu:eui.Image;
	private Federoffen:eui.Image;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	public showOffenSpring(){
		this.Federoffen.visible = true;
		this.Federzu.visible = false;
	}
	
}