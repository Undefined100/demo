const cors = require("cors");
const axios = require("axios");
const express = require("express");

const app = express();
app.use(cors()).use(express.json());

app.get("/api/v1/superDragonTiger", async (req, res) => {
  try {
    const params = req.query;
    const resp = await axios.post(
      "https://www.iwencai.com/gateway/urp/v7/landing/getDataList",
      {
        query: params?.query || "连续涨停 去除st",
        perpage: 10,
        page: 1,
        comp_id: 6910323,
        uuid: 18369,
      },
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "https://www.iwencai.com",
          Referer:
            "https://www.iwencai.com/unifiedmobile/?q=%E8%BF%9E%E7%BB%AD%E6%B6%A8%E5%81%9C%20%E5%8E%BB%E9%99%A4st",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/131.0.0.0",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    // 返回200状态码和JSON数据
    res.status(200).json({
      code: 20000,
      msg: "success",
      data: resp.data.answer?.components[0]?.data?.datas,
    });
  } catch (error) {
    // 返回200状态码和JSON数据
    res.status(500).json({
      code: 50000,
      msg: "error",
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("服务启动成功：http://localhost:3000");
});

// 导出一个函数来处理请求
module.exports = app;
