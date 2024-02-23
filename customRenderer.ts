module.exports = (css: any, { fileName, logger }: any) => {
	logger.log('Example log');
	return `.${css} {}; .${fileName} {};`;
};
