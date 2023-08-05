import React from "react";
import styles from "./TableRoute.module.scss";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { chooseRoute, selectorData } from "../../redux/slices/data";
import { ColumnsType } from "antd/es/table";
import { DataType } from "./TableType";

export const TableRoute = () => {
  const dispatch = useDispatch();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      dispatch(
        chooseRoute([
          selectedRows[0].firstRouteTags,
          selectedRows[0].secondRouteTags,
          selectedRows[0].thirdRouteTags,
        ])
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.route === "Disabled Route",
      name: record.route,
    }),
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Маршрут",
      dataIndex: "route",
      key: "route",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Точка 1 (lat, ing)",
      dataIndex: "firstRouteTags",
      key: "firstRouteTags",
      render: (_, { firstRouteTags }) => (
        <>
          <a>
            {firstRouteTags[0]}, {firstRouteTags[1]}
          </a>
        </>
      ),
    },
    {
      title: "Точка 2 (lat, ing)",
      dataIndex: "secondRouteTags",
      key: "secondRouteTags",
      render: (_, { secondRouteTags }) => (
        <>
          <a>
            {secondRouteTags[0]}, {secondRouteTags[1]}
          </a>
        </>
      ),
    },
    {
      title: "Точка 3 (lat, ing)",
      key: "thirdRouteTags",
      dataIndex: "thirdRouteTags",
      render: (_, { thirdRouteTags }) => (
        <>
          <a>
            {thirdRouteTags[0]}, {thirdRouteTags[1]}
          </a>
        </>
      ),
    },
  ];

  const { data } = useSelector(selectorData);
  return (
    <div className={styles.wrapper}>
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        dataSource={data}
        columns={columns}
      />
    </div>
  );
};
