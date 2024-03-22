import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArrayItems from '../Common/ArrayItems';
import Panel from '../Common/Panel';
import PanelItem from '../Common/PanelItem';
import PanelItemToggle from '../Common/PanelItemToggle';
import RadioButton from '../Common/RadioButton';

import { COLORS } from '../../constants';
import { normalizeId, uniqueArray } from '../../functions';

class Receiver extends Component {
	render = () => {
		return (
			<Panel name="receiver" label="RECEIVER" open>
				<PanelItemToggle
					label="LISTENER ACTIVE"
					value={this.props.status.listening}
					onClick={() => window.node.toggleListen()}
				/>
				<PanelItemToggle
					label="AUTO LISTEN"
					value={this.props.config.autoListen}
					onClick={() =>
						window.node.action('SET_CONFIG', {
							autoListen: !this.props.config.autoListen,
						})
					}
				/>
				<PanelItem>
					<div
						style={{
							height: 20,
							marginBottom: 12,
						}}
					>
						MY NPUBS
					</div>
					<ArrayItems
						items={this.props.config.pubkeys}
						handleAddItem={(value) => {
							const normalized = normalizeId(value);
							window.node.action('RECEIVER_CONFIG', {
								pubkeys: uniqueArray([
									normalized.pubkey,
									...this.props.config.pubkeys,
								]),
							});
						}}
						handleRemoveItem={(value) => {
							window.node.action('RECEIVER_CONFIG', {
								pubkeys: this.props.config.pubkeys.filter((pubkey) => {
									return pubkey !== value;
								}),
							});
						}}
						validateItem={(value) => {
							const normalized = normalizeId(value);
							return normalized.npub && normalized.pubkey;
						}}
						itemKey={(pubkey) => {
							return pubkey;
						}}
						renderItem={(pubkey) => {
							return <div>{normalizeId(pubkey).npub}</div>;
						}}
					/>
				</PanelItem>
				<PanelItem>
					<div
						style={{
							height: 20,
							marginBottom: 12,
						}}
					>
						MY RELAYS
					</div>
					<ArrayItems
						items={this.props.config.relays}
						handleAddItem={(value) => {
							let add;

							if (
								value.indexOf('wss://') === 0 ||
								value.indexOf('ws://') === 0
							) {
								add = value;
							} else {
								add = `wss://${value}`;
							}

							const uniqueUrls = uniqueArray([
								add,
								...this.props.config.relays.map((item) => {
									return item.url;
								}),
							]);

							window.node.action('RECEIVER_CONFIG', {
								relays: uniqueUrls.map((url) => {
									return { url };
								}),
							});
						}}
						handleRemoveItem={(value) => {
							window.node.action('RECEIVER_CONFIG', {
								relays: this.props.config.relays.filter((item) => {
									return item.url !== value.url;
								}),
							});
						}}
						itemKey={(item) => {
							return item.url;
						}}
						renderItem={(item) => {
							return (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										height: 24,
									}}
								>
									<div
										style={{
											marginRight: 8,
											borderRadius: 10,
											border: `6px solid ${this.props.status.relaysConnected[item.url] ? COLORS.green : COLORS.secondary}`,
										}}
									/>
									{item.url}
								</div>
							);
						}}
					/>
				</PanelItem>
				<PanelItem>
					<div
						style={{
							height: 20,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<div>CACHE LEVEL</div>
						<div
							style={{
								display: 'flex',
							}}
						>
							{[1, 2, 3].map((z) => {
								return (
									<div
										style={{
											marginLeft: 16,
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<div
											style={{
												marginRight: 6,
												color: z === this.props.config.cacheLevel,
												//fontSize: 12
											}}
										>
											{z}
										</div>
										<RadioButton
											selected={z === this.props.config.cacheLevel}
											onClick={() => {
												window.node.action('RECEIVER_CONFIG', {
													cacheLevel: z,
												});
											}}
										/>
									</div>
								);
							})}
						</div>
					</div>
					{/*					<div
						style={{
							color: COLORS.secondaryBright,
							marginTop: 12
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: 10
							}}
						>
							<div>
								1 = SELF
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: 10
							}}
						>
							<div>
								2 = SELF + FOLLOWING
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<div>
								3 = SELF + FOLLOWING + EXTRA
							</div>
						</div>
					</div>*/}
				</PanelItem>
			</Panel>
		);
	};
}

export default connect(({ config, status }) => {
	return {
		config,
		status,
	};
})(Receiver);
