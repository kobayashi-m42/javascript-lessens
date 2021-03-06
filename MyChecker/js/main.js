(() => {
  const cards = document.getElementById('cards');
  const check = document.getElementById('check');
  const retry = document.getElementById('retry');
  const userName = document.getElementById('user_name');
  const tweet = document.getElementById('tweet');

  userName.focus();
  /**
   * キャラクラーを生成する
   *
   * @returns {{message: *, job: *, type: *}}
   */
  const createCharacterContents = () => {
    const messages = ['究極の進化を遂げた', '太古より蘇った', '最も恐れられた'];

    const jobs = [
      { name: '勇者', img: 'hero.gif' },
      { name: '魔法使い', img: 'wizard.gif' },
      { name: '武闘家', img: 'fighter.gif' }
    ];

    const types = [
      { name: 'その炎はすべてを焼き尽くす', img: 'bg-fire' },
      { name: 'その清水ですべてを浄化する', img: 'bg-water' },
      { name: 'その雷撃は万物の怒りを鎮める', img: 'bg-thunder' }
    ];

    const generateRandomElement = array =>
      array[Math.floor(Math.random() * array.length)];

    const characterContents = {
      message: generateRandomElement(messages),
      job: generateRandomElement(jobs),
      type: generateRandomElement(types)
    };

    return characterContents;
  };

  /**
   * キャラクターを画面に表示する
   *
   * @param characterContents
   */
  const displayCharacterContents = characterContents => {
    const displayTextContent = (id, text) => {
      document.getElementById(id).textContent = text;
    };

    if (userName.value === '' || userName.value.length > 10) {
      userName.value = '名無し';
    }

    displayTextContent('result_name', userName.value);
    displayTextContent('result_message', characterContents.message);
    displayTextContent('result_job', characterContents.job.name);
    displayTextContent('result_type', characterContents.type.name);

    const resultImg = document.getElementById('result_img');
    resultImg.children[0].src = `img/${characterContents.job.img}`;
    resultImg.className = `left-side ${characterContents.type.img}`;
  };

  const addTweetUrl = characterContents => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${
      userName.value
    }さんは${characterContents.message}${
      characterContents.job.name
    }でした！&hashtags=dotinstall`;
    tweet.href = tweetUrl;
  };

  /**
   * 診断ボタンが押された時の挙動
   */
  const handleCheckBtnClick = () => {
    const characterContents = createCharacterContents();
    displayCharacterContents(characterContents);
    addTweetUrl(characterContents);
  };

  check.addEventListener('click', () => {
    handleCheckBtnClick();
    cards.className = 'move';
  });

  retry.addEventListener('click', () => {
    cards.className = '';
    userName.value = '';
    userName.focus();
  });
})();
