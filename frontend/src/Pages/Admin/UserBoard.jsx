import { useEffect, useState } from 'react'
import { useAuthStore } from '../../Store/useAuthStore.js';
import DeleteModel from '../../Components/Modals/DeleteModel.jsx';

function UserBoard() {
  const { allUsers } = useAuthStore();
  const [search, setSearch] = useState('');
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [isModel, setIsModel] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const data = allUsers.filter(value => value.fullName.toLowerCase().includes(search.toLowerCase()) || value.email.toLowerCase().includes(search.toLowerCase()));
    setUpdatedUsers(data)
  }, [search, allUsers])

  return (
    <div className="h-full w-full px-4 sm:px-6 md:px-10">
      <div className="h-full w-full p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">All Users</h1>

        {/* Top section */}
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 mt-6 mb-4">
          <h1 className="text-base sm:text-lg">Type:</h1>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Name or email" className="h-10 w-full sm:w-80 pl-2 rounded-md border outline-none shadow-sm shadow-black/30" />
        </div>

        <div className="max-h-[82%] overflow-y-auto border border-gray-300 rounded-md">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto bg-white">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th className="w-20 text-sm p-2 border-b border-r">Sr. No.</th>
                  <th className="min-w-[200px] p-2 border-b border-r">Name</th>
                  <th className="min-w-[200px] p-2 border-b border-r">Email</th>
                  <th className="min-w-[150px] p-2 border-b border-r">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  (search ? updatedUsers : allUsers).map((val, ind) => (
                    <tr key={val._id}>
                      <td className="p-2 px-4 text-center border-b border-r">{ind + 1}.</td>
                      <td className="p-2 px-4 border-b border-r">{val.fullName}</td>
                      <td className="p-2 px-4 border-b border-r">{val.email}</td>
                      <td className="p-2 px-4 border-b border-r">
                        <button onClick={() => (setIsModel(true), setUserId(val._id))} className="text-red-500 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteModel isModel={isModel} setIsModel={setIsModel} userId={userId} />
    </div>
  )

}

export default UserBoard