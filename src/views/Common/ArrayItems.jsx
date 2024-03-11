import React, { Component } from 'react';


class ArrayItems extends Component {

	state = {
		error: false,
		add: false,
		adding: ''
	};

	constructor (props) {

		super(props);

		this.input = React.createRef();
	}

	handleAddClicked = () => {

		this.setState({ add: true }, () => {

			if (this.input.current) {
				this.input.current.select();
			}
		});
	};

	handleSaveClicked = () => {

		let valid;

		try {

			valid = !this.props.validateItem || this.props.validateItem(this.state.adding);

		} catch (err) {

			this.setState({
				error: true
			});
		}

		if (valid) {

			if (this.props.handleAddItem) {

				this.props.handleAddItem(this.state.adding);
			}

			this.resetAddState();
		}
	};

	resetAddState = () => {

		this.setState({
			error: false,
			add: false,
			adding: ''
		});
	};

	render = () => {

		return (
			<div>
				{this.props.items.map(item => {
					return (
						<div
							key={this.props.itemKey(item)}
							style={{
								display: 'flex',
								alignItems: 'center'
							}}
						>
							{this.props.renderItem(item)}
							<div
								onClick={() => this.props.handleRemoveItem(item)}
								style={{
									marginLeft: 12
								}}
							>
								[remove]
							</div>
						</div>
					);
				})}
				<div
					style={{
						marginTop: 12
					}}
				>
					{this.state.add ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<input
								ref={this.input}
								value={this.state.adding}
								onChange={({ target }) => this.setState({ adding: target.value })}
								style={{
									background: `rgb(41, 42, 43)`,
									border: 'none',
									outline: 'none',
									fontFamily: 'monospace',
									width: '100%',
									paddingRight: 10,
									height: 32,
									color: '#FFF',
									paddingLeft: 10,
									marginRight: 12
								}}
							/>
							<div
								style={{
									display: 'flex',
									alignItems: 'center'
								}}
							>
								<div
									onClick={this.resetAddState}
								>
									[cancel]
								</div>
								<div
									onClick={this.handleSaveClicked}
								>
									[save]	
								</div>
							</div>
						</div>
					) : (
						<div
							onClick={this.handleAddClicked}
						>
							[add item]
						</div>
					)}
				</div>
			</div>
		);
	};
}

export default ArrayItems;
