import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import none from "../assets/img/none.jpg";
import FormModal from "../components/FormModal";
import { productFields } from "../helper/ProductField";
import {
  deleteProduct,
  fetchProducts,
  productActions,
} from "../store/product-slice";

const ListProducts = () => {
  const header = ["Image", "Name", "Price", "Actions"];

  const { showModal, allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const form = useSelector((state) => state.product.form);
  const edit = useSelector((state) => state.product.edit);

  useEffect(() => {
    dispatch(fetchProducts("All"));
  }, [showModal]);

  const editProduct = (e, id) => {
    e.preventDefault();
    dispatch(productActions.setEdit(true));
    dispatch(productActions.setShowModal(true));

    const data = allProducts.find((item) => item.id === id);

    dispatch(productActions.fillForm(data));
    console.log(form);
  };

  const addProduct = (e) => {
    e.preventDefault();
    dispatch(productActions.setShowModal(true));
  };

  return (
    <>
      {showModal && (
        <FormModal
          addTitle={"Add Product"}
          updateTitle={"Update Product"}
          fields={productFields}
          actions={productActions}
          form={form}
          edit={edit}
        />
      )}

      <div className=" md:pr-10 md:pl-5 md:w-9/12">
        <div className="flex justify-between">
          <div className="flex items-center font-bold cursor-pointer text-xl mb-3">
            <p>Product Management</p>
          </div>
          <button
            onClick={(e) => addProduct(e)}
            className="py-2 px-4 bg-indigo-500 text-white rounded"
          >
            Add Product
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg ">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {header.map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 relative">
                    {allProducts?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {item.image ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`}
                              className="w-24 h-24"
                              alt=""
                            />
                          ) : (
                            <img src={none} className="w-24 h-24" alt="" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.price}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            onClick={(e) => editProduct(e, item.id)}
                            className="text-green-500 hover:text-red-700 mr-3"
                            href="#"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => dispatch(deleteProduct(item.id))}
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProducts;
