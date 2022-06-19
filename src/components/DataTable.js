// load react helpers
import { useEffect, useState, Fragment } from 'react';
// load css
import 'antd/dist/antd.css';
import '../App.css';
// load antd helpers
import { Table, Input } from 'antd';
const { Search } = Input;

const DataTable = ({ columns, inCart }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        sortBy:"created_at",
        sortOrder:"desc",
        search:""
    });

    const onSearch = (value) => {

        pagination.search = value;
        pagination.current = 1;
        
        fetchData({
            pagination:pagination
        });
        
    }

    const fetchData = (params = {}) => {

        setLoading(true);

        if (inCart) {

            const productItems = JSON.parse(window.localStorage.getItem("CART_ITEMS"));

            setData(productItems);

            setLoading(false);
            
        } else {

            const {current, pageSize, sortBy, sortOrder, search } = params.pagination;

            fetch(`/api/products?page=${current}&limit=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}&search=${search}`)
                .then((res) => res.json())
                .then(({data, meta}) => {
                    setData(data);
                    setLoading(false);
                    setPagination({
                        ...params.pagination,
                        total: meta != null ? meta.total : 0
                    });
                }).catch(error => {
                    alert(error)
                    console.error('There was an error!', error);
                });
        }

        
    };

    useEffect(() => {
        fetchData({
            pagination,
        });
    }, []);

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortBy: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    const handleDeletedProduct = (record, index) => {

        console.log(record)

        if (inCart && record.is_deleted) return "strikeout";
        
        return null;
    };

    return (
        <Fragment>
            {!inCart && (<Search placeholder="Search by product name" allowClear onSearch={onSearch} style={{width: 350, textAlign:'center'}}/>)}
            <Table
                size="small"
                columns={columns}
                rowKey="id"
                dataSource={data}
                pagination={pagination}
                loading={loading}
                rowClassName={handleDeletedProduct}
                onChange={handleTableChange}
            />
        </Fragment>
    );
}

export default DataTable