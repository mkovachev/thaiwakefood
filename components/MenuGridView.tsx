import React, { } from 'react'
import { StyleSheet, FlatList, Platform, Dimensions, useWindowDimensions } from 'react-native'
import { MenuItem } from '../data/MenuItem'
import MenuItemView from './MenuItemView'
import { EmptyView } from './EmptyView'

interface Props {
  data: MenuItem[]
  handleShowDetails?: (item: MenuItem) => void
}

const MenuGridView = ({ data }: Props) => {
  const { width } = useWindowDimensions()
  const mobileColumns = Math.floor(width / 150)
  const webColumns = Math.floor(window.innerWidth / 400)

  return (
    <FlatList
      data={data}
      numColumns={Platform.OS === 'web' ? webColumns : mobileColumns}
      renderItem={({ item }) => (<MenuItemView item={item} />)}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.container, Platform.OS === 'web' && styles.webContainer]}
      ListEmptyComponent={<EmptyView />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'web' ? 100 : 20,
  },
  webContainer: {
    overflow: 'scroll'
  }
})

export default MenuGridView
