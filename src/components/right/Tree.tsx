import React, { useRef, useEffect, useState } from "react";
import { select, tree, zoom, hierarchy, linkVertical, linkHorizontal } from 'd3';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';


const Tree = ({ explorer, srcApp }) => {
  const svgRef = useRef(null);
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('100%');
  const [open, setOpen] = useState(false);
  const [resetView, setResetView] = useState(false)

  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 1000,
  //   height: 'fit-content',
  //   bgcolor: '#42464C',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };



  const createTree = (data) => {


    if (data.isFolder) {
      return {
        name: data.name,
        isFolder: data.isFolder,
        children: data.items.map((item) => createTree(item)),
      };
    } else {
      return { name: data.name };
    }
  
  };

  const setTreeNodePositions = (node) => {
    let x = 0;
    let y = 0;

    if (node.children) {
      // Adjust the x position based on the children
      node.children.forEach((child) => {
        setTreeNodePositions(child);
        x += child.x;
      });
      x /= node.children.length;
    }

    // Update the x and y positions for the current node
    node.x = x;
    node.y = y;

    return node;
  };

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth - 20;
      const maxHeight = window.innerHeight - 20;
      const newWidth = Math.min(maxWidth, 400);
      const newHeight = Math.min(maxHeight, 400);
      setWidth(newWidth);
      setHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(createTree(srcApp));

    // Set the initial positions of tree nodes
    setTreeNodePositions(root);

    const treeLayout = tree()
      .size([height, width]);

    const treeData = treeLayout(root);

    const pathGenerator = linkHorizontal()
      .x((d) => d.y + 40)
      .y((d) => d.x);

    const g = svg.append('g');

    g.selectAll('path')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr("stroke", 'white')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('d', pathGenerator);

      const nodes = g.selectAll("g")
  .data(treeData.descendants())
  .enter()
  .append("g")
  .attr("transform", (d) => `translate(${d.y + 40},${d.x})`);

nodes.append("circle")
  .attr("r", 5)
  .style('fill', (d) => (d.data.isFolder ? 'yellow' : 'white')); // Change node fill color based on isFolder property

nodes.append("text")
  .text((d) => d.data.name)
  .attr("dy", 20)
  .attr('dx', -20)
  .attr("text-anchor", "middle")
  .attr("fill", (d) => (d.data.isFolder ? 'yellow' : '#bdbdbd'))
  .style("font-size", "1.00rem");

  const zoomBehavior = zoom()
  .scaleExtent([0.5, 10]) // Set the zoom scale extent
  .on("zoom", (event) => {
    g.attr("transform", event.transform); // Apply the zoom transform to the entire tree
  });

svg.call(zoomBehavior);



  }, [explorer, width, height, open, resetView]);

  const treeStyles = {
    height: '400px',
    width: '100%',
 };

  return (
    <div style={{height: '10px'}}>
    {/* <button onClick={() => setOpen(true)}>
      Tree
      </button>

    <Modal
          open={open}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
           <Box sx={style}>
           <Typography
              id='modal-title'
              variant='h6' 
              component='h2'
              style={{ fontSize: 30 }}
            >
              src/app
            </Typography>

      
      <svg ref={svgRef} style={treeStyles}></svg>
      <Button onClick={() => setOpen(false)} sx={{ fontSize: 20 }}>
              Close
            </Button>
      </Box>

      
      </Modal> */}
        <button onClick={() => setResetView(!resetView)} style={{color: 'white', marginLeft: '10px', backgroundColor: 'black'}}>Reset View</button>
            <svg ref={svgRef} style={treeStyles}></svg>

    </div>
  );
};

export default Tree;
