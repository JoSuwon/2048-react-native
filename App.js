/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GestureRecognizer from 'react-native-swipe-gestures';

const App = () => {

  // let [board, setBoard] = useState([[0,0,0,0], [0,0,0,0], [0,0,0,0], [2,2,0,0]]);
  let [board, setBoard] = useState([[4,2,2,4], [0,0,0,0], [0,0,0,0], [0,0,0,0]]);

  const onSwipe = (direction, state) => {
    console.log(direction);

    if(direction === 'SWIPE_UP') {
      let newBoard = swipeRight(rotateRight(board));
      for(let i=0; i<3; i++) {
        newBoard = rotateRight(newBoard);
      }
      setBoard(createNewBox(newBoard));
    } 
    else if(direction === 'SWIPE_DOWN') {
      let newBoard = swipeLeft(rotateRight(board));
      for(let i=0; i<3; i++) {
        newBoard = rotateRight(newBoard);
      }
      setBoard(createNewBox(newBoard));
    } 
    else if(direction === 'SWIPE_LEFT') {
      setBoard(createNewBox(swipeLeft(board)));
    } 
    else if(direction === 'SWIPE_RIGHT') {
      setBoard(createNewBox(swipeRight(board)));
    }
  };

  const createNewBox = (nowBoard) => {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    while(nowBoard[y][x] !== 0) {
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    }
    if(Math.random() < 0.2) { // 20%
      nowBoard[y][x] = 4;
    } else { // 80%
      nowBoard[y][x] = 2;
    }
    return nowBoard;
  };

  const rotateRight = (nowBoard) => {
    let newBoard = [];
    for(let i=0; i<4; i++) {
      let newRow = [];
      for(let j=0; j<4; j++) {
        newRow.push(nowBoard[4-1-j][i]);
      }
      newBoard.push(newRow);
    }
    console.log(newBoard);
    return newBoard;
  };



  const swipeRight = (nowBoard) => {
    let newBoard = nowBoard.map(row => {
      return row.filter(box => {
        return box !== 0;
      });
    });
    for(let i=0; i<newBoard.length; i++) {
      for(let j=newBoard[i].length-1; j>=1; j--) {
        if(newBoard[i][j] !== 0 && newBoard[i][j] === newBoard[i][j-1]) {
          newBoard[i][j] *= 2;
          newBoard[i].splice(j-1, 1);
          j--;
        }
      }
    }
    for(let i=0; i<newBoard.length; i++) {
      let row = newBoard[i];
      let setRow = [];
      for(let j=0; j<4-row.length; j++) setRow.push(0);
      newBoard[i] = setRow.concat(newBoard[i]);
    }
    console.log(newBoard);
    return newBoard;
  };

  const swipeLeft = (nowBoard) => {
    let newBoard = nowBoard.map(row => {
      return row.filter(box => {
        return box !== 0;
      });
    });
    console.log(newBoard);
    for(let i=0; i<newBoard.length; i++) {
      for(let j=0; j<newBoard[i].length-1; j++) {
        if(newBoard[i][j] !== 0 && newBoard[i][j] === newBoard[i][j+1]) {
          newBoard[i][j] *= 2;
          newBoard[i].splice(j+1, 1);
        }
      }
    }
    for(let i=0; i<newBoard.length; i++) {
      let row = newBoard[i];
      let setRow = [];
      for(let j=0; j<4-row.length; j++) setRow.push(0);
      newBoard[i] = newBoard[i].concat(setRow);
    }
    console.log(newBoard);
    return newBoard;
  }

  const config = {
    velocityThreshold: 0,
    directionalOffsetThreshold: 50,
    gestureIsClickThreshold: 100,
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>2048 Game</Text>
      </SafeAreaView>
      <GestureRecognizer
        onSwipe={ onSwipe }
        config={ config }
        style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ width: 320, height: 320, borderColor: '#bbad9f', borderWidth: 3, borderRadius: 8 }}>
          {board.map(row => {
            return (
              <Row row={ row }></Row>
            );
          })}
        </View>
      </GestureRecognizer>
    </>
  );
};

const Row = (props) => {
  console.log(props.row);
  return (
    <>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {props.row.map(box => {
          return (
            <Box num={ box }></Box>
          );
        })}
      </View>
    </>
  );
};

const Box = (props) => {
  // console.log(props.num);
  //       배경		   글자
  // 2	  #eee4da		#776e65
  // 4	  #ede0c8		#776e65
  // 8	  #f2b179		#f9f6f2
  // 16	  #f59563		#f9f6f2
  // 32	  #f67c5f		#f9f6f2
  // 64	  #f65e3b		#f9f6f2
  // 128	#edcf72		#f9f6f2
  // 256	#edcc61		#f9f6f2
  // 512	#edc850		#f9f6f2
  // 1024	#edc53f		#f9f6f2
  // 2048	#edc22e		#f9f6f2
  // 4096	#3c3a32		#f9f6f2
  // 8192	#3c3a32		#f9f6f2

  const boxColor = {
    0: ['#cdc1b5', '#776e65'],
    2: ['#eee4da', '#776e65'],
    4: ['#ede0c8', '#776e65'],
    8: ['#f2b179', '#f9f6f2'],
    16: ['#f59563', '#f9f6f2'],
    32: ['#f67c5f', '#f9f6f2'],
    64: ['#f65e3b', '#f9f6f2'],
    128: ['#edcf72', '#f9f6f2'],
    256: ['#edcc61', '#f9f6f2'],
    512: ['#edc850', '#f9f6f2'],
    1024: ['#edc53f', '#f9f6f2'],
    2048: ['#edc22e', '#f9f6f2'],
    4096: ['#3c3a32', '#f9f6f2'],
    8192: ['#3c3a32', '#f9f6f2'],
  };

  return (
    <>
      <View style={{ flex:1, borderWidth: 2, borderColor: '#bbad9f', backgroundColor: boxColor[props.num][0], justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: boxColor[props.num][1] }}>{ props.num === 0 ? '' : props.num }</Text>
      </View>
    </>
  );
};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
