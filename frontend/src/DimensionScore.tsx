import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Radar } from '@ant-design/plots';
import { postData } from './service/http';

const DemoRadar = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchScores = async () => {
      const profileId = '80';
      const response = await postData(`/getProfile/${profileId}`); // 你的后端API路径
      const jsonData = await response.json();
      if (jsonData && jsonData.scores) {
        setData(jsonData.scores);
      }
    };

    fetchScores();
  }, []);



  const config = {
    data,
    xField: 'aspect',
    yField: 'value',
    seriesField: 'user',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 100,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启面积
    area: {},
    // 开启辅助点
    point: {
      size: 2,
    },
 

  };

  return <Radar {...config} />;
};

export default DemoRadar;
