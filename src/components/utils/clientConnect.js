import TcpSocket from 'react-native-tcp-socket'

export const connectOptions = [
  {
    host: '192.168.100.86',
    port: 5050
  },
  {
    host: '192.168.100.83',
    port: 5050
  },
  {
    host: '192.168.100.87',
    port: 5050
  }
]

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
