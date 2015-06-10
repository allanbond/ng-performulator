  var Column = FixedDataTable.Column; 
  var PropTypes = React.PropTypes; 
  var Table = FixedDataTable.Table; 
  
  var columnWidths = {
    name: 240,
    occupation: 150,
    dob: 140
  };
  var isColumnResizing = false;
  
  var ReactTable = React.createClass({
    propTypes: {
      onContentDimensionsChange: PropTypes.func,
      left: PropTypes.number,
      top: PropTypes.number
    },
    _onContentHeightChange: function (contentHeight) {
      this.props.onContentDimensionChange && 
      this.props.onContentDimensionsChange(
        contentHeight,
        Math.max(600, this.props.tableWidth)
      );
    },
    _onColumnResizeEndCallback: function(newColumnWidth, dataKey) {
      columnWidths[dataKey] = newColumnWidth;
      isColumnResizing = false;
      this.forceUpdate();
    },
    render: function() {
      colDefs = this.props.colGetter();
      var colNodes = colDefs.map(function(colDef, index) {
        return (
          <Column 
            label={colDef.name}
            dataKey={index}
            width={50}
            isResizable={true}
            minWidth={50}
            maxWidth={100}
          />
        );
      });

      return (
        <Table
          rowHeight={30}
          headerHeight={50}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount()}
          width={this.props.tableWidth}
          height={this.props.tableHeight}
          onContentHeightChange={this._onContentHeightChange}
          scrollTop={this.props.top}
          scrollLeft={this.props.left}
          overflowX={"auto"}
          overflowY={"auto"}
          isColumnResizing={isColumnResizing}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
          {colNodes}
        </Table>
      );
    }
  });