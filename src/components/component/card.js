import React from "react";
import { Link } from "react-router-dom";
import cssModules from '../../components/style/home.module.css'

import convertRupiah from "rupiah-format";

export default function ProductComponent({ item }) {
    return (
        <Link to={`/product/` + item.id} style={{ textDecoration: "none" }} >
            <div className={cssModules.card} >
                <img src={item.image} className="img-fluid img-rounded" alt={item.name} />
                <div className="p-2">
                    <div className="text-header-product-item">{item.title}</div>
                    <div className="text-product-item">{convertRupiah.convert(item.price)}</div>
                    <div className="text-product-item">Stock : {item.qty}</div>
                </div>
            </div>
        </Link>
    );
}