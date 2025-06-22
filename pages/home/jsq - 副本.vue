<template>
	<view class="calculator">
		<Display :input="input" :output="output" />
		<view class="buttons">
			<Button label="C" type="clear" @click="clear" />
			<Button label="+/-" @click="sign" />
			<Button label="%" @click="percent" />
			<Button label="÷" type="operator" @click="operator('/')" />
			<Button label="7" @click="append(7)" />
			<Button label="8" @click="append(8)" />
			<Button label="9" @click="append(9)" />
			<Button label="×" type="operator" @click="operator('*')" />
			<Button label="4" @click="append(4)" />
			<Button label="5" @click="append(5)" />
			<Button label="6" @click="append(6)" />
			<Button label="-" type="operator" @click="operator('-')" />
			<Button label="1" @click="append(1)" />
			<Button label="2" @click="append(2)" />
			<Button label="3" @click="append(3)" />
			<Button label="+" type="operator" @click="operator('+')" />
			<Button label="0" type="w150" @click="append(0)" />
			<Button label="." @click="decimal" />
			<Button label="=" type="operator" @click="equal" />
		</view>
	</view>
</template>

<script>
	import Button from '@/components/jsq/Button.vue'
	import Display from '@/components/jsq/Display.vue'
	import {
		Interpreter
	} from "eval5";
	export default {
		name: 'Calculator',
		components: {
			Button,
			Display
		},
		data() {
			return {
				input: '',
				output: '0'
			}
		},
		methods: {
			append(value) {
				if (this.input.toString() === '') {
					this.output = '0'
					this.input = value.toString();
					return
				}
				if (this.input.toString() === "0") {
					this.input = value.toString();
				} else {
					this.input += value.toString()
				}
			},
			clear() {
				this.input = ''
				this.output = '0'
			},
			sign() {
				if (!this.input) {
					return
				}
				this.input = (-parseFloat(this.input)).toString()
			},
			percent() {
				if (!this.input) {
					return
				}
				this.input = (parseFloat(this.input) / 100).toString()
			},
			decimal() {
				if (!this.input.includes('.')) {
					this.input += '.'
				}
			},
			operator(operator) {
				// if (this.input === ''&&this.output!=='0') {
					
				// 	return
				// }
				if (this.input === '') {
					
					return
				}

				if (this.input.endsWith(operator)) {
					return
				}

				if (this.input.endsWith('+') || this.input.endsWith('-') || this.input.endsWith('*') || this.input
					.endsWith('/')) {
					this.input = this.input.slice(0, -1) + operator
				} else {
					this.input += operator
				}
			},
			equal() {
				const interpreter = new Interpreter(window);
				// let result = eval(this.input)
				let result = interpreter.evaluate(this.input)

				if (isNaN(result) || !isFinite(result)) {
					this.output = 'Error'
				} else {
					this.input = ''
					this.output = result.toString()
				}
			}
		}
	}
</script>

<style>
	@import url("@/static/css/base.css");

	.buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding-bottom: 60rpx;
	}


	.calculator {
		background-color: #1c1c1e;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.display {
		background-color: #000;
		color: #fff;
		font-size: 48px;
		padding: 30px;
		text-align: right;
		flex-grow: 1;
	}

	.input {
		font-size: 24px;
		opacity: 0.5;
		margin-bottom: 5px;
	}

	.button {
		background-color: #333;
		color: #fff;
		font-size: 24px;
		border-radius: 100%;
		width: 75px;
		height: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		margin: 5px;
		transition: background-color 0.3s;
	}

	.button:hover {
		background-color: #444;
	}

	.operator {
		background-color: #f5a623;
		color: #fff;
	}

	.clear {
		background-color: #d3d3d3;
		color: #000;
	}


	.row {
		display: flex;
		flex-wrap: wrap;
	}
</style>