/**
 * 此数据是图表展示的数据
 * 横坐标：array内的time字段，以图表展示第一天的0时起，1代表1个小时，
 * 一天24小时，25代表第二天第一个小时，故横坐标最大值为24*7=168，
 * 每种图形的横坐标都是以此为标准，
 * 纵坐标：根据图表和配置的不同去实时计算点的位置
 */
export const chartData = [
    {
        type: "text",
        time: 3,
        text: "入\n院\n于\n00\n时\n30\n分",
        color: "blue"
    }, // 入院时间
    {
        type: "line",
        color: "navy",
        cellMin: 20,
        cellSplit: 5,
        shape: "empty-circle",
        array: [
            {
                time: 3,
                value: 120
            },
            {
                time: 8,
                value: 130
            }
        ]
    },
    {
        type: "line",
        color: "orange",
        cellMin: 20,
        cellSplit: 5,
        shape: "x",
        array: [
            {
                time: 3,
                value: 100,
                tips: "肛温111"
            },
            {
                time: 8,
                value: 90,
                tips: "肛温111"
            }
        ]
    },
    // 折线图类型
    {
        type: "line",
        color: "blue", // 画线的颜色
        cellMin: 20, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        array: [
            {
                time: 3, //横坐标，入院三小时
                value: 110, // 纵坐标的值，实际坐标系位置需要与cellMin与cellSplit一起计算
                tips: "脉搏110" // 鼠标移动到点上时显示的文字信息
            },
            {
                time: 8,
                value: 120,
                break: true //折现在此中断一下
            },
            {
                time: 10,
                value: 110
            },
            {
                time: 15,
                value: 100
            },
            {
                time: 21,
                value: 120
            },
            {
                time: 26,
                value: 130,
                tips: "脉搏130",
                extra: 110,
                extraTips: "脉搏110",
                extraColor: "red",
                others: [
                    {
                        time: 28,
                        value: 105,
                        tips: "脉搏120",
                        color: "red"
                    },
                    {
                        time: 25,
                        value: 115,
                        tips: "脉搏120"
                    }
                ]
            },
            // 同一个格子内，数据变化
            {
                time: 28,
                value: 100
            },
            {
                time: 33,
                value: 120
            },
            {
                time: 39,
                value: 110
            },
            {
                time: 45,
                value: 100
            },
            {
                time: 51,
                value: 120
            },
            {
                time: 57,
                value: 130
            }
        ]
    },
    // 折现区域图
    {
        type: "area",
        color: "red", // 画线的颜色
        bgColor: "rgba(255,0,0,0.7)",
        cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        array: [
            {
                time: 3,
                v1: 42,
                v2: 20,
                v1Tips: "脉搏xxx",
                v2Tips: "心跳YYY"
            },
            {
                time: 9,
                v1: 50,
                v2: 30
            },
            {
                time: 15,
                v1: 70,
                v2: 50
            },
            {
                time: 21,
                v1: 55,
                v2: 44
            },
            {
                time: 27,
                v1: 60,
                v2: 40
            }
        ]
    },
    // 标签类型
    {
        type: "tag",
        color: "#000",
        text: "R", // 展示的文字
        cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 150, // 标签所有的y坐标都是一样的
        array: [
            {
                time: 3,
                tips: "这里是hover下的信息提示",
                y: 120
            },
            {
                time: 9,
                y: 130
            },
            {
                time: 15,
                y: 110
            },
            {
                time: 21
            },
            {
                time: 27
            }
        ]
    },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "red",
        cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 120 // 标签所有的y坐标都是一样的
    }
];

// 表格数据
export const tableData = {
    name: "黄光裕", //姓名
    sex: "男", // 性别
    age: "56", // 年龄
    department: "呼吸科", //科室
    bed: "12", // 床号
    hospitalized: "12", // 住院号
    // 日期
    date: [
        "18年10月14日",
        "18年10月15日",
        "18年10月16日",
        "18年10月17日",
        "18年10月18日",
        "18年10月19日",
        "18年10月20日"
    ],
    // 患病日数
    daysAfterSick: [1, 2, 3, 4, 5, 6, 7],
    // 术后日数
    daysAfterOperation: [0, 0, 0, 1, 2, 3, 4],
    // 小便量
    peeVolume: [100, 100, 100, 100, 100, 100, 100],
    // 大便次数
    shitTimes: [2, 2, 2, 2, 2, 2, 2],
    // 输入量
    inputVolume: [100, 100, 100, 100, 100, 100, 100],
    // 饮入量
    drinkVolume: [100, 100, 100, 100, 100, 100, 100],
    // 排出量
    excretionVolume: [100, 100, 100, 100, 100, 100, 100],
    // 血压
    // bloodPressure: [100, 100, 100, 100, 100, 100, 100],
    // 身高/体重
    height: [1, 1, 1, 1, 1, 1, 1],
    weight: [1, 1, 1, 1, 1, 1, 1],
    // 新的血压
    bloodPressure: [
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"]
    ],
    // 疼痛
    pain: [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
    ],
    // 呼吸
    breath: [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
    ]
};

export const configData = {
    // N等分，只支持4或者6
    daySplit: 6,
    // 图例
    legend: [
        // {
        //     name: "疼痛",
        //     color: "#000"
        // },
        {
            name: "体温",
            color: "blue"
        },
        {
            name: "脉搏",
            color: "red"
        },
        {
            name: "呼吸",
            color: "#2f1c77"
        }
    ],
    // 竖坐标配置
    yAxisData: [
        {
            name: "脉搏",
            displayMax: 150, // 显示的最大值
            displayMin: 40, // 显示的最小值
            displaySplit: 10, // 显示值递增的间隔
            cellMin: 20, // 坐标轴最小值
            cellSplit: 5 // 坐标轴每格代表的值
        },
        {
            name: "呼吸",
            displayMax: 55, // 显示的最大值
            displayMin: 15, // 显示的最小值
            displaySplit: 5, // 显示值递增的间隔
            cellMin: 7, // 坐标轴最小值
            cellSplit: 2 // 坐标轴每格代表的值
        },
        {
            name: "体温摄氏",
            displayMax: 42, // 显示的最大值
            displayMin: 35, // 显示的最小值
            displaySplit: 1, // 显示值递增的间隔
            cellMin: 33.8, // 坐标轴最小值
            cellSplit: 0.3 // 坐标轴每格代表的值
        }
        // {
        //     name: "疼痛",
        //     displayMax: 10, // 显示的最大值
        //     displayMin: 1, // 显示的最小值
        //     displaySplit: 9, // 显示值递增的间隔
        //     cellMin: -7, // 坐标轴最小值
        //     cellSplit: 2 // 坐标轴每格代表的值
        // }
    ]
};
