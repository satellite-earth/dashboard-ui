import React, { Component, useState } from 'react';
import TextButton from '../../components/TextButton';
import Input from './Input.jsx';

function InlineForm({ onCancel, onSubmit }) {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (onSubmit) onSubmit(value);
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 12,
			}}
		>
			<Input value={value} onChange={({ target }) => setValue(target.value)} required />
			<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
				<TextButton onClick={onCancel}>[cancel]</TextButton>
				<TextButton type="submit">[save]</TextButton>
			</div>
		</form>
	);
}

class ArrayItems extends Component {
	state = {
		error: false,
		add: false,
	};

	constructor(props) {
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

	handleAddItem = (value) => {
		let valid;

		try {
			valid = !this.props.validateItem || this.props.validateItem(value);
		} catch (err) {
			this.setState({ error: true });
		}

		if (valid) {
			if (this.props.handleAddItem) {
				this.props.handleAddItem(value);
			}

			this.resetAddState();
		}
	};

	resetAddState = () => {
		this.setState({
			error: false,
			add: false,
		});
	};

	render = () => {
		return (
			<div>
				{this.props.items.map((item) => (
					<div
						key={this.props.itemKey(item)}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{this.props.renderItem(item)}
						<TextButton
							onClick={() => this.props.handleRemoveItem(item)}
							style={{
								marginLeft: 12,
							}}
						>
							[remove]
						</TextButton>
					</div>
				))}
				<div
					style={{
						marginTop: 12,
					}}
				>
					{this.state.add ? (
						<InlineForm onCancel={() => this.resetAddState()} onSubmit={(v) => this.handleAddItem(v)} />
					) : (
						<TextButton onClick={this.handleAddClicked}>[add item]</TextButton>
					)}
				</div>
			</div>
		);
	};
}

export default ArrayItems;
