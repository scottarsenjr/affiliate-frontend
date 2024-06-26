import {useFetchCarriersQuery, useLazyFetchCarriersQuery} from "@/reducers/slices/carriers.ts";
import {ECarrierFields, ICarrier} from "@/types/carriers";
import {Input, InputRef, Modal, Table, TableProps} from "antd";
import {SearchOutlined, FilterOutlined} from '@ant-design/icons';
import {formatIsoDateString} from "@/utils/formatIsoDateString.ts";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {removeNullValues} from "@/utils/removeNullValues.ts";
import {debounce} from "lodash";
import styles from './style.module.scss';
import CardModal from "@/app/components/CardModal";
import {secondsToDtfmt} from "@/utils/secondsToDtfmt.ts";

const MainPage = () => {
    const [limit, setLimit] = useState<number | null>(12);
    const [offset, setOffset] = useState<number | null>(0);

    const [orderBy, setOrderBy] = useState<ECarrierFields | null>(ECarrierFields.carrier_id);
    const [orderType, setOrderType] = useState<'asc' | 'desc' | null>('asc');

    const [minEcpc, setMinEcpc] = useState<string | null>(null);
    const [carrierName, setCarrierName] = useState<string | null>(null);
    const [countryName, setCountryName] = useState<string | null>(null);

    const searchInput = useRef<InputRef | null>(null);

    const [filteredCount, setFilteredCount] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);

    const queryParams = removeNullValues({
        limit,
        offset,
        order_by: orderBy,
        order_type: orderType,
        min_ecpc: minEcpc,
        carrier_name: carrierName,
        country_name: countryName,
    });

    const { data: carriers, error, isLoading } = useFetchCarriersQuery(queryParams);
    const [triggerSearch, { data: lazyCarriers, isLoading: isLazyLoading }] = useLazyFetchCarriersQuery(queryParams);

    const debounceSearch = debounce((name: string | null, country: string | null, minEcpc: string | null) => {
        triggerSearch(removeNullValues({ ...queryParams, carrier_name: name, country_name: country, min_ecpc: minEcpc }));
    }, 500);

    const handleCarrierNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCarrierName(e.target.value);
        debounceSearch(e.target.value, countryName, minEcpc);
    };

    const handleCountryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountryName(e.target.value);
        debounceSearch(carrierName, e.target.value, minEcpc);
    };

    const handleMinEcpcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinEcpc(e.target.value);
        debounceSearch(carrierName, countryName, e.target.value);
        setModalVisible(true);
    };

    const debouncedTriggerSearch = debounce((params: {[p: string]: any}) => {
        triggerSearch(params);
    }, 500);

    useEffect(() => {
        if (carriers) {
            setFilteredCount(carriers.count);
        }
    }, [carriers]);

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const getColumnSearchProps = (dataIndex: string, filterHandler: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, icon?): any => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={placeholder ? placeholder : `Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={filterHandler}
                    style={{ display: "block" }}
                />
            </div>
        ),
        filterIcon: (filtered: boolean) => icon ? icon : <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value: string, record: ICarrier) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
    });

    const columns: TableProps<ICarrier>["columns"] = [
        {
            title: "ID",
            dataIndex: "carrier_id",
            key: "carrier_id",
            render: (id) => <a>{id}</a>,
            width: "10%",
            sorter: true,
        },
        {
            title: "Carrier",
            dataIndex: "carrier_name",
            key: "carrier_name",
            ...getColumnSearchProps("carrier_name", handleCarrierNameChange, 'Search Carrier Name'),
            width: "25%",
            sorter: true,
        },
        {
            title: "Country",
            dataIndex: "country_name",
            key: "country_name",
            ...getColumnSearchProps("country_name", handleCountryNameChange, 'Search Country Name'),
            width: "22%",
            sorter: true,
        },
        {
            title: "ECPC Recent",
            dataIndex: "ecpc_recent",
            key: "ecpc_recent",
            width: "20%",
            sorter: true,
            ...getColumnSearchProps("ecpc_recent", handleMinEcpcChange, 'Filter Min ECPC', <FilterOutlined/>),
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (updatedAt) => formatIsoDateString(updatedAt),
            width: "23%",
            sorter: true,
        },
    ];

    const onTableChange: TableProps<ICarrier>['onChange'] = useCallback(
        (pagination, filters, sorter) => {
            const sortField = sorter.field! as ECarrierFields;
            const sortOrder = sorter.order! === 'ascend' ? 'asc' : sorter.order! === 'descend' ? 'desc' : null;

            setOrderBy(sortField || null);
            setOrderType(sortOrder);

            if (pagination) {
                setOffset((pagination.current! - 1) * pagination.pageSize!);
            }
        },
    );

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <>
            {carriers && modalVisible && minEcpc != 0 && (
                    <div className={styles.modal}>
                        <CardModal
                            title={`Found ${filteredCount} elements with Min ECPC: ${minEcpc}`}
                            subtitle={`Active Time: ${secondsToDtfmt(filteredCount * 15 * 60)}`}
                            onClose={handleModalClose}
                        />
                    </div>
                )
            }
            <div>
                <Table
                    columns={columns}
                    dataSource={carriers.results}
                    onChange={onTableChange}
                    rowKey='carrier_id'
                    className={styles.customTableHeader}
                    pagination={{
                        showSizeChanger: false,
                        position: ['bottomCenter'],
                        pageSize: limit,
                        total: carriers.count,
                    }}
                    loading={isLazyLoading}
                >
                </Table>
            </div>
        </>
    );
};

export default MainPage;
