var Note = React.createClass({displayName: "Note",

	getInitialState: function(){
		return {editing: false};
	},

	//组件将要显示之前设置inline-style
	componentWillMount: function(){
		this.style = {
			right: this.randomPos(0, window.innerWidth - 150) + 'px',
			top: this.randomPos(0, window.innerHeight - 150) + 'px',
			transform: 'rotate(' + this.randomPos(-15, 15) + 'deg)'
		}
	},

	//组件渲染后使用jquery ui draggable
	componentDidMount: function(){
		$(this.getDOMNode()).draggable();
	},

	randomPos: function(min, max) {
		return (min + Math.ceil(Math.random() * max));
	},

	edit: function(){
		this.setState({editing: true});
	},

	save: function(){
		//var noteContent = this.refs.newTxt.getDOMNode().value; //获取真实DOM的值
		//alert('保存: ' + noteContent);
		//触发onChange,子组件向父组件传递数据
		this.props.onChange(this.refs.newTxt.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},

	remove: function(){
		this.props.onRemove(this.props.index);
		this.setState({editing: false});
	},

	renderShow: function() {
		return (
			React.createElement("div", {className: "note", style: this.style}, 
				React.createElement("p", null, this.props.children), 
        React.createElement("span", null, 
          React.createElement("button", {
            className: "btn btn-sm btn-primary glyphicon glyphicon-pencil", 
            onClick: this.edit}, 
            "编辑"
          ), 
          React.createElement("button", {
            className: "btn btn-sm btn-danger glyphicon glyphicon-trash", 
            onClick: this.remove}, 
            "删除"
          )
        )
			)
		);
	},

	renderEditing: function() {
    return (
    	React.createElement("div", {className: "note", style: this.style}, 
    		React.createElement("textarea", {ref: "newTxt", 
    		          defaultValue: this.props.children, 
    		          className: "form-control"}
    		), 
    		React.createElement("button", {onClick: this.save, 
    		        className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk"})
    	)
    )
	},

	render: function(){
		if(this.state.editing) {
			return this.renderEditing();
		}else{
			return this.renderShow();
		}
	}
});