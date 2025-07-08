'use client';

import React from "react";
import f3 from 'family-chart';  // npm install family-chart@0.7.0 or yarn add family-chart@0.7.0
import 'family-chart/styles/family-chart.css';

export default class FamilyTree extends React.Component {
  cont = React.createRef();

  componentDidMount() {
    if (!this.cont.current) return;
    
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => create(data))
      .catch(err => console.error('Failed to load family data:', err))

    function create(data) {
      const f3Chart = f3.createChart('#FamilyChart', data)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setSingleParentEmptyCard(true, {label: 'ADD'})
        .setShowSiblingsOfMain(false)
        .setOrientationVertical()
    
      const f3Card = f3Chart.setCard(f3.CardHtml)
        .setCardDisplay([["first name","last name"],["birthday"]])
        .setCardDim({})
        .setMiniTree(true)
        .setStyle('imageRect')
        .setOnHoverPathToMain()
    
      
      const f3EditTree = f3Chart.editTree()
        .fixed(true)
        .setFields(["first name","last name","birthday","avatar"])
        .setEditFirst(true)
        .setCardClickOpen(f3Card)
      
      f3EditTree.setEdit()
      
      // f3Chart.onUpdateTree((newTreeData) => {
      //   fetch('/api/save-family', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(newTreeData),
      //   }).then(res => {
      //     if (!res.ok) {
      //       console.error('Failed to save family tree');
      //     }
      //   });
      // });
    
      f3Chart.updateTree({initial: true})
      f3EditTree.open(f3Chart.getMainDatum())
    
      f3Chart.updateTree({initial: true})
    }
  }
  
  render()  {
    return <div className="f3 f3-cont" id="FamilyChart" ref={this.cont}></div>;
  }
}