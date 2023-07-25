const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const manifestLocation = getManifestLocation(process.env.browser);
const manifest = require(`./config/${manifestLocation}`);
const versionNumber = manifest.version.split('.').join('-');

function getManifestLocation(browser) {
	switch (browser) {
		case 'firefox':
			return 'firefox-manifest.json';
		case 'edge':
			return 'edge-manifest.json';
		case 'ios':
			return 'safari-manifest.json';
		default:
			return 'chrome-manifest.json';
	}
}

module.exports = {
	mode: 'production',
	context: path.resolve(__dirname, 'app'),
	entry: {
		'scripts/content': './scripts/content/index.js',
		'scripts/background': './scripts/background/index.js',
		'scripts/popup': './scripts/popup.js'
	},

	module: {
		rules: [
			{
				test: /\.styl(us)?$/,
				use: ['style-loader', 'css-loader', 'stylus-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					esModule: true
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
		
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(
									__dirname,
									'./postcss.config.js'
								)
							}
						}
					}
				]
			},
			{
				test: /\.(txt|pdf)$/i,
				use: "raw-loader",
			  },
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							publicPath: '..'
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new CopyPlugin({
			patterns: [
				{ 
					context: path.resolve(__dirname, 'config'),
					
					from: manifestLocation, to: `${path.resolve(__dirname, 'dist')}/manifest.json` },
				{
					context: path.resolve(__dirname, 'app'),
					from: 'assets/styles/css/',
					to: 'assets/css/'
				},
				{
					context: path.resolve(__dirname, 'app'),
					from: 'index.html',
					to: 'index.html'
				},
				{
					context: path.resolve(__dirname, 'app'),
					from: 'assets/images/',
					to: 'assets/images/'
				},
				{
					context: path.resolve(__dirname, 'app'),
					from: 'assets/fonts/',
					to: 'assets/fonts/'
				},
				{
					context: path.resolve(__dirname, 'app'),
					from: 'assets/styles/',
					to: 'assets/styles/'
				},
				{
					context: path.resolve(__dirname, 'app'),
					from: '_locales/',
					to: '_locales/'
				},
				{
					from: './assets/images/',
					to: path.resolve(__dirname, 'dist/assets/images/')
				},
				{
					from: 'index.html',
					to: path.resolve(__dirname, 'dist/')
				}
			]
		}),

		new ZipPlugin({
			path: `../build/${process.env.browser}/${versionNumber}/`,
			filename: `opendyslexic-${process.env.browser}-${versionNumber}.zip`,
			include: [
				/\.js$/,
				/\.json$/,
				/\.css$/,
				/\.html$/,
				/\.otf$/,
				/\.png$/,
				/\.jpg$/,
				/\.jpeg$/,
				/\.gif$/
			]
		})
	],

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'app'),
			'@assets': path.resolve(__dirname, 'app/assets'),
			'@styles': path.resolve(__dirname, 'app/assets/styles'),
			'@scripts': path.resolve(__dirname, 'app/scripts'),
		}
	}
};
