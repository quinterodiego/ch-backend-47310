import log4js from 'log4js'

log4js.configure({
    appenders: {
        file: { type: 'file', filename: './src/logs/errors.log' },
        console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'trace' },
        dev: { appenders: ['console'], level: 'debug' },
        prod: { appenders: ['console', 'file'], level: 'info' }
    }
})

const loggerDev = log4js.getLogger('dev')
const loggerProd = log4js.getLogger('prod')

export const logger = () => {
    loggerDev.trace('Imprimo trace')
    loggerDev.debug('Imprimo debug')
    loggerDev.info('Imprimo info')
    loggerDev.warn('Imprimo warn')
    loggerDev.error('Imprimo error')
    loggerDev.fatal('Imprimo fatal')

    loggerProd.trace('Imprimo trace')
    loggerProd.debug('Imprimo debug')
    loggerProd.info('Imprimo info')
    loggerProd.warn('Imprimo warn')
    loggerProd.error('Imprimo error')
    loggerProd.fatal('Imprimo fatal')
}