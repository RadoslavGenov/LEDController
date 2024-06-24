import TcpSocket from 'react-native-tcp-socket'
import { IP_1, IP_2, IP_3 } from '@env'

export const connectOptions = [IP_1, IP_2, IP_3].map((ip) => ({
  host: ip,
  port: 5050
}))

export const clientConnect = (options) => {
  let client = TcpSocket.createConnection(options, () => {
    console.log('connection successful')
  })

  client.on('error', (e) => {
    client.destroy()
    setTimeout(() => {
      client = TcpSocket.createConnection(options, () => {
        console.log('reconnected')
      })
    }, [1000])
  })

  client.on('close', (e) => {
    client.destroy()
    setTimeout(() => {
      client = TcpSocket.createConnection(options, () => {
        console.log('reconnected')
      })
    }, [1000])
  })

  return client
}
