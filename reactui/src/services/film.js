const headers = {
  "Content-Type": "application/json",
};


export async function list() {
  const options = { headers };
  const response = await fetch("/api/film/", options);
  return await response.json();
}

export async function retrieve(id) {
  const url = `/api/film/${id}`;
  const options = { headers };
  const response = await fetch(url, options);
  return await response.json();
}

export async function create(name, created, actors) {
  const data = { name, created, actors };
  const options = {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  };
  const url = "/api/film/";
  const response = await fetch(url, options);
  return await response.json();
}

export async function update(id, data) {
  if (data.actors && data.actors.length === 0) delete data.actors;

  const options = {
    headers,
    method: "PATCH",
    body: JSON.stringify(data),
  };

  const url = `/api/film/${id}/`;
  const response = await fetch(url, options);
  return await response.json();
}

export async function delete_(id) {
  const options = {
    headers,
    method: "DELETE",
  };

  const url = `/api/film/${id}/`;
  const response = await fetch(url, options);
  return await response.json();
}
