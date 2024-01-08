export function mapOptions(list: any[], labelIndex: string, valueIndex: string) {
  return list.map((item) => {
    return {
      label: item[labelIndex],
      value: item[valueIndex]
    }
  })
}

export function fetchAsyncOptions(
  dataP: Promise<any>,
  { dataIndex = 'data', labelIndex = 'name', valueIndex = 'id' } = {}
) {
  return () => {
    return new Promise<any>((reslove) => {
      dataP.then((res) => {
        let data = res
        const newDataIndex = dataIndex.split('.')
        for (const index of newDataIndex) {
          data = data[index]
        }
        reslove(mapOptions(data, labelIndex, valueIndex))
      })
    })
  }
}
