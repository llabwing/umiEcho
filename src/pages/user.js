import router from 'umi/router';

export default function() {
  return (
    <div>
      <h1>Page index</h1>
      <button onClick={() => { router.goBack(); }}>go back</button>
    </div>
  );
}
