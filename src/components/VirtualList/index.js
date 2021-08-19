/* eslint-disable react/prop-types */
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

const VirtualList = ({
  children: Children, calcHeight = 0, collection, ...props
}) => (
  <div style={{ height: `calc(100vh + ${calcHeight}px)` }}>
    <AutoSizer>
      {({ width, height }) => (
        <List
          {...props}
          rowCount={collection.length}
          width={width}
          height={height}
          rowRenderer={({ index, style, key }) => (
            <div style={style} key={key}>
              <Children {...collection[index]} index={index} />
            </div>
          )}
        />
      )}
    </AutoSizer>
  </div>
);

export default VirtualList;
