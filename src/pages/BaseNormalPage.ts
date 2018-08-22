class BaseNormalPage extends eui.Component {
    constructor(){
        super();
    }
    public createChildren() {
        super.createChildren();
        this.percentHeight=100;
        this.percentWidth =100;
    }
}