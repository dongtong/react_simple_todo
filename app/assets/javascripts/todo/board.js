var Board = React.createClass({displayName: "Board",

	propTypes: {
		count: function(props, propName) {
			if(typeof props[propName] !== 'number') {
				return new Error('count属性必须是数字');
			}

			if(props[propName] > 100) {
				return new Error('todo事项不能超过100个');
			}
		}
	},

	//初始化状态
	getInitialState: function(){
		return {
			notes: []
		};
	},

	newId: function(){
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},

	//组件显示之前获取数据源
	componentWillMount: function(){
		var $this = this;
		$.getJSON('/api/v1/todos', function(result) {
			console.log(result["data"])
				var data = result["data"];
				if(data.length) {
					data.forEach(function(todo){
						$this.add(todo.content, todo.id);
					})
				}
			}
		);
	},

	//添加TODO事项
	add: function(newNote, id) {
		var arr = this.state.notes;
		arr.push({
			id: id || this.newId,
			note: newNote
		});
		this.setState({notes: arr});
	},

	//更新TODO事项
	update: function(newTxt, index) {
		console.log(newTxt)
		console.log(index)
		var $this = this,
		    arr = $this.state.notes;
		arr[index].note = newTxt;
		$.ajax({
			type: 'POST',
			url: '/api/v1/todos',
			data: {content: newTxt},
			dataType: 'json',
			success: function(res){
				if(res.success){
					$this.setState({notes: arr});
				}else{
					alert('新建待办事项失败');
				}
			}
		});
	},

	//删除TODO事项
	remove: function(index){
		var $this = this,
		    arr = this.state.notes,
				id = arr[index].id;

		$.ajax({
			type: 'DELETE',
			url: '/api/v1/todos/' + id,
			dataType: 'json',
			success: function(res){
				if(res.success){
					arr.splice(index, 1);
					$this.setState({notes: arr});
				}else{
					alert('删除待办事项失败');
				}
			}
		});
	},

	//将render中map部分抽离出来，尽量保持render的简单性
	eachNote: function(note, index){
		return (
				React.createElement(Note, {key: index, 
							index: index, 
							onChange: this.update, 
							onRemove: this.remove
				}, note.note)
			)
	},

	render: function(){
		return (
				React.createElement("div", {className: "board"}, 
					this.state.notes.map(this.eachNote), 
					React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
					        onClick: this.add.bind(null, '新事项')}
					)
				)
			)
	}
});