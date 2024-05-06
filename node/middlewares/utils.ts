/* eslint-disable @typescript-eslint/no-explicit-any */

export const encrypt = (data: string, object = false) => {
  const key = new Date().toISOString()
  let encryptedData = ''

  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length)

    encryptedData += String.fromCharCode(charCode)
  }

  const resultData = {
    data: btoa(encryptedData),
    timestamp: key,
  }

  return object ? resultData : JSON.stringify(resultData)
}

export function decrypt(encryptedData: any, key: string) {
  const data = atob(encryptedData) // Decodifica desde base64
  let result = ''

  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length)

    result += String.fromCharCode(charCode)
  }

  return JSON.parse(result)
}
